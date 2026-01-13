/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	ApprentissagesCritiques = "apprentissages_critiques",
	Competences = "competences",
	Modules = "modules",
	Projets = "projets",
	Semestres = "semestres",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type ApprentissagesCritiquesRecord = {
	code?: string
	competences?: RecordIdString[]
	created?: IsoDateString
	description?: HTMLString
	id: string
	updated?: IsoDateString
}

export type CompetencesRecord = {
	created?: IsoDateString
	description?: HTMLString
	id: string
	nom?: string
	updated?: IsoDateString
}

export enum ModulesTypeOptions {
	"sae" = "sae",
	"ressource" = "ressource",
}
export type ModulesRecord = {
	created?: IsoDateString
	description?: HTMLString
	id: string
	nom?: string
	semestres?: RecordIdString
	type?: ModulesTypeOptions
	updated?: IsoDateString
}

export type ProjetsRecord = {
	annee?: number
	created?: IsoDateString
	id: string
	img_projet?: string
	lien_projet?: string
	modules?: RecordIdString
	nom_projet?: HTMLString
	updated?: IsoDateString
}

export type SemestresRecord = {
	created?: IsoDateString
	description?: HTMLString
	id: string
	nom?: string
	numero?: number
	updated?: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type ApprentissagesCritiquesResponse<Texpand = unknown> = Required<ApprentissagesCritiquesRecord> & BaseSystemFields<Texpand>
export type CompetencesResponse<Texpand = unknown> = Required<CompetencesRecord> & BaseSystemFields<Texpand>
export type ModulesResponse<Texpand = unknown> = Required<ModulesRecord> & BaseSystemFields<Texpand>
export type ProjetsResponse<Texpand = unknown> = Required<ProjetsRecord> & BaseSystemFields<Texpand>
export type SemestresResponse<Texpand = unknown> = Required<SemestresRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	apprentissages_critiques: ApprentissagesCritiquesRecord
	competences: CompetencesRecord
	modules: ModulesRecord
	projets: ProjetsRecord
	semestres: SemestresRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	apprentissages_critiques: ApprentissagesCritiquesResponse
	competences: CompetencesResponse
	modules: ModulesResponse
	projets: ProjetsResponse
	semestres: SemestresResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'apprentissages_critiques'): RecordService<ApprentissagesCritiquesResponse>
	collection(idOrName: 'competences'): RecordService<CompetencesResponse>
	collection(idOrName: 'modules'): RecordService<ModulesResponse>
	collection(idOrName: 'projets'): RecordService<ProjetsResponse>
	collection(idOrName: 'semestres'): RecordService<SemestresResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
