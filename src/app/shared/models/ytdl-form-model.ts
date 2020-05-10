export class YtdlFormModel {
	constructor(public url: string, public filetype: string, public format: string, public quality: string) {}
}

export class FileDataModel {
	constructor(public url: string, public fileName: string) {}
}
