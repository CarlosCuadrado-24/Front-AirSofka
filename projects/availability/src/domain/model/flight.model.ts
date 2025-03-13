export interface IFlight {
  flightId: string;
  flightNumber: string;
  aircraftModel: string;
  duration: number;
  operatingAirline: string;
  origin: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  tax: ITaxes; 
  prices: IPrices;
  totalPricesInfo: ITotalPricesInfo;
}

export interface IFlightSelected {
  flightId: string;
  flightNumber: string;
  aircraftModel: string;
  duration: number;
  operatingAirline: string;
  origin: { name: string; abbreviation: string; airport: string };
  destination: { name: string; abbreviation: string; airport: string };
  departureTime: Date;
  arrivalTime: Date;
  tax: number; 
  prices: number;
  totalPricesInfo: number;
}

export interface IRequiredFlight {
  passengers: {
    adults: number;
    children: number;
    infants: number;
  },
  origin: string;
  destination: string;
  date: Date;
}

export interface IFormFlight {
  origin: {
    name: string;
    abbreviation: string;
    airport: string;
  },
  destination: {
    name: string;
    abbreviation: string;
    airport: string;
  },
  dates: {
    departure: Date;
    return: Date;
  },
  passengers: {
    adults: number;
    children: number;
    infants: number;
  }
}


export interface ITaxes {
  standardTax: number;
  economicTax: number;
  favorableTax: number;
  executiveTax: number;
  executiveFullTax: number;
}

interface IPrices {
  standardPrice: number;
  economicPrice: number;
  favorablePrice: number;
  executivePrice: number;
  executiveFullPrice: number;
}

export interface ITotalPricesInfo {
  standardPriceTotal: number;
  economicPriceTotal: number;
  favorablePriceTotal: number;
  executiveTotalPrice: number;
  executiveFullTotalPrice: number;
}