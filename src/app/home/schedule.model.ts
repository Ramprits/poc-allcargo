export interface Vessel {
  name: string;
  imoNumber: string;
}

export interface Carrier {
  scac: string;
  name: string;
}

export interface PlaceOfReceipt {
  unCode: string;
  countryCode: string;
  name: string;
  stateName?: any;
}

export interface PortOfLoading {
  unCode: string;
  countryCode: string;
  name: string;
  stateName?: any;
}

export interface Hub {
  unCode: string;
  countryCode: string;
  name: string;
  stateName?: any;
}

export interface PortOfDischarge {
  unCode: string;
  countryCode: string;
  name: string;
  stateName?: any;
}

export interface Schedule {
  id: string;
  vessel: Vessel;
  voyageNumber: string;
  productType: string;
  cutOff: Date;
  cutOffIMO: Date;
  etd: Date;
  eta: Date;
  carrier: Carrier;
  placeOfReceipt: PlaceOfReceipt;
  portOfLoading: PortOfLoading;
  hub: Hub;
  portOfDischarge: PortOfDischarge;
  transitTimePortToPort: number;
  transitTimeCutOffToPort: number;
  comments: string;
}

export interface Country {
  code: string;
  name: string;
}
