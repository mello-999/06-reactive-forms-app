export interface Country {
    data: Data;
}

export interface Data {
    objects: Object[];
    meta:    Meta;
}

export interface Meta {
    total:      number;
    count:      number;
    limit:      number;
    offset:     number;
    more:       boolean;
    request_id: string;
    duration:   number;
}

export interface Object {
    names:   Names;
    codes:   Codes;
    borders: string[];
    _meta:   MetaClass;
}

export interface MetaClass {
    lastUpdatedTimestamp: number;
}

export interface Codes {
    alpha_3: string;
}

export interface Names {
    alternates:   string[];
    common:       string;
    native:       { [key: string]: Native };
    official:     string;
    translations: { [key: string]: Native };
}

export interface Native {
    common:   string;
    official: string;
}
