
export interface BuildPaths {
	entry ?: string
	html ?: string
	output ?: string
	src ?: string
	public ?: string
}

export type BuildPlatform = 'mobile' | 'desktop'

export type BuildMode = 'production' | 'development'

export interface BuildOptions { 
	port : number
	paths :  BuildPaths
	mode : BuildMode
	analyzer ?: boolean
	platform : BuildPlatform
}