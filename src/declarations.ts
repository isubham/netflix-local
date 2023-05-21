
type MediaFile = {
    id: string;
    filename: string;
    type: string,
    content : string;
};

type MediaFolder = {
    id: string; 
    filename: string, type: string, 
    content : Array<MediaFile>
}

export { MediaFile, MediaFolder }