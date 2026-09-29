export interface Country {
    name: Names;
    cca3: string;
    borders: string[];
}


export interface Names {
    alternates:   string[];
    common:       string;
    native:       { [key: string]: Native };
    
}


export interface Native {
    common:   string;
    official: string;
}

