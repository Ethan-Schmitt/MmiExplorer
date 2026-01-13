<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref } from "vue";
import PocketBase from 'pocketbase';
import DetailCard from "./DetailCard.vue";

// 1. DÉSACTIVER HEADER/FOOTER VIA LE LAYOUT
definePageMeta({
  layout: "blank", 
});

// --- CONFIGURATION POCKETBASE ---
const pb = new PocketBase('http://127.0.0.1:8090');

const graphContainer = ref<HTMLElement | null>(null);
const showDetailCard = ref(false);
const conceptDetails = ref({
  id: '',
  title: '',
  link: '',
  description: ''
});

const getLocalLink = (id: string, col: string) => {
  return `${window.location.origin}/filtre/${id}?col=${col}`;
};

onMounted(async () => {
  if (!graphContainer.value) return;

  // 1. CHARGEMENT
  let semestres = [], competences = [], enseignements = [];
  
  try {
    const res = await Promise.all([
      pb.collection('Semestre').getFullList({ sort: 'name' }), 
      pb.collection('Competence').getFullList(),
      pb.collection('Enseignements').getFullList(),
    ]);
    semestres = res[0];
    competences = res[1];
    enseignements = res[2];
  } catch (err) {
    console.error("Erreur PB", err);
    return;
  }

  // 2. CONSTRUCTION HIÉRARCHIE STRICTE
  const rootNode = { 
    id: "Programme BUT", 
    label: "Programme BUT",
    type: "main", 
    expanded: true, 
    children: [] as any[] 
  };

  const semesterNodes = semestres.map((sem: any) => {
    
    // Filtrage strict : Enseignements appartenant à CE semestre
    const ensInSem = enseignements.filter((e: any) => e.semestre === sem.id);

    // Compétences actives dans ce semestre
    const activeCompIds = new Set();
    ensInSem.forEach((e: any) => {
        if (e.competences && Array.isArray(e.competences)) {
            e.competences.forEach((cId: string) => activeCompIds.add(cId));
        }
    });

    const compNodes = competences
        .filter((c: any) => activeCompIds.has(c.id)) 
        .map((comp: any) => {
            
            const specificEns = ensInSem.filter((e: any) => 
                e.competences && e.competences.includes(comp.id)
            );

            const ensNodes = specificEns.map((ens: any) => {
                let subtype = 'Ressource';
                if (ens.type === 'SAE' || ens.type === 'Stage') subtype = 'SAE';
                
                return {
                    id: ens.code ? ens.code : ens.name, 
                    label: ens.code ? ens.code : ens.name,
                    realId: ens.id,
                    title: ens.name,
                    type: "subchild",
                    subtype: subtype,
                    description: ens.description || "Aucune description.",
                    link: getLocalLink(ens.id, 'Enseignements'),
                };
            });

            return {
                id: `${sem.name} - ${comp.name}`, 
                label: comp.name, 
                realId: comp.id,
                type: "child",
                expanded: false,
                children: ensNodes
            };
        });

    return {
      id: sem.name,
      label: sem.name,
      type: "category",
      expanded: false,
      children: compNodes
    };
  });

  const initialNodes = [rootNode, ...semesterNodes];
  
  // --- D3 CONFIG ---
  d3.select(graphContainer.value).selectAll("*").remove();

  const data = {
    nodes: JSON.parse(JSON.stringify(initialNodes)),
    links: initialNodes.slice(1).map((n:any) => ({
        source: "Programme BUT",
        target: n.id
    }))
  };

  const hierarchyLookup: any = {};
  hierarchyLookup[rootNode.id] = semesterNodes;

  semesterNodes.forEach((sem: any) => {
    hierarchyLookup[sem.id] = sem.children; 
    sem.children.forEach((comp: any) => {
      hierarchyLookup[comp.id] = comp.children;
    });
  });

  const width = window.innerWidth;
  const height = window.innerHeight;

  const customColors = ["#4A7F9A", "#8C5E78", "#A8C349", "#CCB67C", "#DD8E50", "#B55C4D"];
  const parentColors: string[] = [];
  const colorScale = d3.scaleOrdinal(customColors);

  const svg = d3.select(graphContainer.value)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100vh")
    .style("background", "transparent") 
    .style("position", "fixed")
    .style("top", 0)
    .style("left", 0)
    .style("z-index", 50);

  const svgGroup = svg.append("g");

  svg.call(
    (d3.zoom() as any).scaleExtent([0.1, 3]).on("zoom", (e: any) => {
      svgGroup.attr("transform", e.transform);
    })
  );

  // --- PHYSIQUE ---
  const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id((d: any) => d.id)
        .distance((link: any) => {
            const target = link.targetNode || link.target;
            const targetType = target.type;
            
            if (targetType === "category") return 300; 
            if (targetType === "child") return 220;    
            if (targetType === "subchild") return 140; 
            return 200;
        })
    )
    .force("charge", d3.forceManyBody().strength(-1000).theta(0.8))
    .force("collision", d3.forceCollide().radius((d:any) => {
        if (d.type === "main") return 70;
        if (d.type === "category") return 65;
        if (d.type === "child") return 50;
        if (d.type === "subchild") return 35;
        return 40;
    }).strength(1))
    .force("center", d3.forceCenter(width / 2, height / 2));

  const linkGroup = svgGroup.append("g").attr("class", "links");
  const nodeGroup = svgGroup.append("g").attr("class", "nodes");
  const labelGroup = svgGroup.append("g").attr("class", "labels");

  function getBorderColor(d: any) {
    if (d.type === "child" && d.parentColor) return d.parentColor;
    if (d.type === "subchild") return "#fff";
    
    if (!d.assignedColor) {
      d.assignedColor = d.type === "main" ? "#ef4444" : colorScale(parentColors.length.toString());
      if (d.type === "category") parentColors.push(d.assignedColor);
    }
    return d.assignedColor;
  }

  function getFillColor(d: any) {
    if (d.type === "subchild") {
        if (d.subtype === 'SAE') return "#ff9a9a"; // Rose
        if (d.subtype === 'Ressource') return "#60a5fa"; // Bleu
        if (d.subtype === 'AC') return "#facc15"; // Jaune
        return "#475569"; 
    }
    return getBorderColor(d);
  }

  function getDescendantsIds(nodeId: string, currentNodes: any[]): string[] {
    const childrenIds: string[] = [];
    const linksFromNode = data.links.filter((l: any) => {
        const sId = typeof l.source === 'object' ? l.source.id : l.source;
        return sId === nodeId;
    });
    
    linksFromNode.forEach((l: any) => {
        const tId = typeof l.target === 'object' ? l.target.id : l.target;
        childrenIds.push(tId);
        childrenIds.push(...getDescendantsIds(tId, currentNodes));
    });
    return childrenIds;
  }

  function updateGraph() {
    const nodeId = (ref: any) => (ref && typeof ref === "object" ? ref.id : ref);
    const linkKey = (d: any) => `${nodeId(d.source)}-${nodeId(d.target)}`;

    const link = linkGroup.selectAll("line").data(data.links, linkKey);
    const linkEnter = link.enter().append("line")
        .attr("stroke-width", 0)
        .style("opacity", 0);

    linkEnter.merge(link as any)
      .attr("stroke", (d: any) => {
          const target = d.targetNode || d.target;
          if(target.type === "subchild") return getFillColor(target);
          return getBorderColor(target);
      })
      .transition().duration(300)
      .attr("stroke-width", 2)
      .style("opacity", 0.6);

    link.exit().transition().duration(300).style("opacity", 0).remove();

    const node = nodeGroup.selectAll("circle").data(data.nodes, (d: any) => d.id);
    
    const nodeEnter = node.enter().append("circle")
      .attr("r", 0)
      .attr("stroke-width", (d: any) => d.type === "subchild" ? 2 : 3)
      .style("cursor", "pointer")
      .call((d3.drag() as any).on("start", dragStarted).on("drag", dragged).on("end", dragEnded))
      .on("click", (event: any, d: any) => handleNodeClick(d));

    nodeEnter.merge(node as any)
      .attr("stroke", (d: any) => getBorderColor(d))
      .style("fill", (d: any) => getFillColor(d)) 
      .transition().duration(350)
      .attr("r", (d: any) => {
        if (d.type === "main") return 65;
        if (d.type === "category") return 55;
        if (d.type === "child") return 40;
        if (d.type === "subchild") return 25;
        return 30;
      });

    node.exit().transition().duration(350).attr("r", 0).remove();

    const labels = labelGroup.selectAll("text").data(data.nodes, (d: any) => d.id);

    labels.enter().append("text")
      .text((d: any) => d.label || d.id) 
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "#334155") 
      .style("pointer-events", "none")
      .attr("font-weight", "700")
      .style("text-shadow", "0 0 3px white, 0 0 5px white") 
      .attr("font-family", "'Inter', sans-serif")
      .merge(labels as any)
      .attr("font-size", (d: any) => {
        if (d.type === "main") return "22px";
        if (d.type === "category") return "18px";
        if (d.type === "child") return "14px";
        if (d.type === "subchild") return "12px";
        return "12px";
      });

    labels.exit().transition().duration(350).style("opacity", 0).remove();

    simulation.nodes(data.nodes).on("tick", () => {
      linkGroup.selectAll("line")
        .attr("x1", (d: any) => (d.sourceNode || d.source).x)
        .attr("y1", (d: any) => (d.sourceNode || d.source).y)
        .attr("x2", (d: any) => (d.targetNode || d.target).x)
        .attr("y2", (d: any) => (d.targetNode || d.target).y);

      nodeGroup.selectAll("circle").attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);

      labelGroup.selectAll("text")
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => {
            if (d.type === "subchild") return d.y + 35;
            return d.y - (d.type === "main" ? 80 : 70);
        });
    });

    simulation.force("link").links(data.links);
    simulation.alpha(1).restart();
  }

  function handleNodeClick(d: any) {
    if (d.type === "subchild") {
        conceptDetails.value.id = d.realId || d.id;
        conceptDetails.value.title = d.title;
        conceptDetails.value.link = d.link;
        conceptDetails.value.description = d.description;
        showDetailCard.value = true;
        return;
    }

    const isExpanding = !d.expanded;
    d.expanded = isExpanding;

    if (isExpanding) {
        const childrenToAdd = hierarchyLookup[d.id];
        if (childrenToAdd && childrenToAdd.length > 0) {
            childrenToAdd.forEach((child: any) => {
                if (d.type === "category") {
                    child.parentColor = getBorderColor(d);
                    child.parentNode = d;
                } else if (d.type === "child") {
                    child.grandParentColor = getBorderColor(d.parentNode || d);
                    child.parentNode = d;
                }

                if (!data.nodes.find((n) => n.id === child.id)) {
                    const newNode = { 
                        ...child, 
                        x: d.x + (Math.random() - 0.5) * 20, 
                        y: d.y + (Math.random() - 0.5) * 20 
                    }; 
                    data.nodes.push(newNode);
                    
                    data.links.push({ 
                        source: d,
                        target: newNode
                    });
                }
            });
        }
    } else {
        const idsToRemove = getDescendantsIds(d.id, data.nodes);
        data.nodes.forEach(n => { if(idsToRemove.includes(n.id)) n.expanded = false; });
        data.nodes = data.nodes.filter(n => !idsToRemove.includes(n.id));
        
        data.links = data.links.filter((l: any) => {
            const sId = typeof l.source === 'object' ? l.source.id : l.source;
            const tId = typeof l.target === 'object' ? l.target.id : l.target;
            return !idsToRemove.includes(tId) && !idsToRemove.includes(sId);
        });
    }

    updateGraph();
  }

  function dragStarted(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event: any, d: any) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragEnded(event: any, d: any) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  updateGraph();
});
</script>

<template>
  <div class="page-background">
    <NuxtLink to="/" class="fixed-back-btn">
      ← Retour à l'accueil
    </NuxtLink>

    <div ref="graphContainer" class="w-full h-screen"></div>

    <DetailCard 
      v-if="showDetailCard" 
      :concept="conceptDetails"
      @close="showDetailCard = false"
    />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

.page-background {
  background: linear-gradient(135deg, #e0f2fe 0%, #fff9db 100%);
  min-height: 100vh;
  width: 100%;
  font-family: "Inter", sans-serif;
  overflow: hidden;
  position: relative; /* Important pour que le bouton fixe se repère bien */
}

/* 4. STYLE DU BOUTON FIXE */
.fixed-back-btn {
  position: fixed;
  top: 30px;
  left: 30px;
  z-index: 100; /* Doit être supérieur au SVG (50) */
  
  background: rgba(255, 255, 255, 0.7); /* Blanc semi-transparent */
  backdrop-filter: blur(10px); /* Effet verre */
  
  color: #334155;
  font-weight: 700;
  text-decoration: none;
  
  padding: 12px 24px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  
  transition: all 0.3s ease;
}

.fixed-back-btn:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  color: #3b82f6; /* Bleu au survol */
}

svg {
  cursor: grab;
}
svg:active {
  cursor: grabbing;
}
</style>