import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ClassCardComponent } from "../class-card/class-card.component";
import { ClassCardData } from '../../../../domain/model/card.model';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { IFormFlight, ITotalPricesInfo } from '../../../../domain/model/flight.model';

@Component({
  selector: 'lib-flight-info',
  imports: [ClassCardComponent, CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './flight-info.component.html',
  styleUrl: './flight-info.component.scss',
})
export class FlightInfoComponent implements OnInit {
  @Input() public form!: IFormFlight;
  @Input() public flightNumber!: string;
  @Input() public departureTime!: Date;
  @Input() public arrivalTime!: Date;
  @Input() public duration!: number;
  @Input() public standardTotalPrice!: number;
  @Input() public executiveTotalPrice!: number;
  @Input() public totalPricesInfo!: ITotalPricesInfo;

  @Output() public onFlightSelected = new EventEmitter<{price: number, flightNumber: string}>();

  public economicClassCards: ClassCardData[] = [];
  public executiveClassCards: ClassCardData[] = [];
  
  isEconomicActive = false;
  isExecutiveActive = false;

  toggleClass(classType: string) {
    if (classType === 'economic') {
      this.isEconomicActive = !this.isEconomicActive;
      this.isExecutiveActive = false; 
    } else if (classType === 'executive') {
      this.isExecutiveActive = !this.isExecutiveActive;
      this.isEconomicActive = false; 
    }
  }

  onCardSelected(selectedCard: {price: number}) {
    const selectedFlight = {
      price: selectedCard.price,
      flightNumber: this.flightNumber
    };

    this.onFlightSelected.emit(selectedFlight);
  }

  ngOnInit() {
    this.economicClassCards = [
      {
        type: 'Económica Basic',
        description: 'Tarifa más restrictiva. Viaje Ligero',
        price: this.totalPricesInfo?.standardPriceTotal,
        conditions: [
          { icon: 'dolar.svg', text: 'Equipaje en bodega con cargo', alt: 'Dolar' },
          { icon: 'dolar.svg', text: 'Preselección de asientos con cargo', alt: 'Dolar' },
          { icon: 'check.svg', text: 'Ascenso PreferMembers (prioridad baja)', alt: 'Check' },
          { icon: 'check.svg', text: 'Acumula 50% de millas ConnectMiles', alt: 'Check' },
        ],
        others: [
          { icon: 'dolar.svg', text: 'Cambios permitidos con penalidad', alt: 'Dolar' },
          { icon: 'cancel.svg', text: 'Tarifa no reembolsable', alt: 'Cancel' },
        ],
        colorHeader: '#0e68ff'
      },
      {
        type: 'Económica Classic',
        description: 'Los beneficios que esperas',
        price: this.totalPricesInfo?.economicPriceTotal,
        conditions: [
          { icon: 'check.svg', text: '1 equipaje en bodega (23kg)', alt: 'Check' },
          { icon: 'check.svg', text: 'Preselección de asientos regulares', alt: 'Check' },
          { icon: 'check.svg', text: 'Ascenso PreferMembers (prioridad media)', alt: 'Check' },
          { icon: 'check.svg', text: 'Acumula 100% de millas ConnectMiles', alt: 'Check' },
        ],
        others: [
          { icon: 'check.svg', text: '1 cambio sin penalidad', alt: 'Check' },
          { icon: 'cancel.svg', text: 'Tarifa no reembolsable', alt: 'Cancel' },
        ],
        colorHeader: '#0032a0'
      },
      {
        type: 'Económica Full',
        description: 'Mejor flexibilidad para tu viaje',
        price: this.totalPricesInfo?.favorablePriceTotal,
        conditions: [
          { icon: 'check.svg', text: '2 equipajes en bodega (23kg)', alt: 'Check' },
          { icon: 'check.svg', text: 'Preselección de asientos Premium', alt: 'Check' },
          { icon: 'check.svg', text: 'Ascenso PreferMembers (prioridad alta)', alt: 'Check' },
          { icon: 'check.svg', text: 'Acumula 125% de millas ConnectMiles', alt: 'Check' },
        ],
        others: [
          { icon: 'check.svg', text: 'Cambios limitados sin penalidad', alt: 'Check' },
          { icon: 'check.svg', text: 'Tarifa reembolsable', alt: 'Cancel' },
        ],
        colorHeader: '#001a66'
  
      }
    ];

    this.executiveClassCards = [
      {
        type: 'Ejecutuva Promo',
        description: 'Máxima comodidad a mejor precio',
        price: this.totalPricesInfo?.executiveTotalPrice,
        conditions: [
          { icon: 'check.svg', text: '1 equipajes en bodega (32 kg)', alt: 'Check' },
          { icon: 'check.svg', text: 'Preselección de todos los asientos', alt: 'Check' },
          { icon: 'check.svg', text: 'Acumula 175% de millas ConnectMiles', alt: 'Check' },
        ],
        others: [
          { icon: 'check.svg', text: '1 cambio sin penalidad', alt: 'Check' },
          { icon: 'cancel.svg', text: 'Tarifa no reembolsable', alt: 'Cancel' },
        ],
        colorHeader: '#866d4b'
      },
      {
        type: 'Ejecutiva Full',
        description: 'Máxima flexibilidad y Comodidad',
        price: this.totalPricesInfo?.executiveFullTotalPrice,
        conditions: [
          { icon: 'check.svg', text: '2 equipajes en bodega (32kg)', alt: 'Check' },
          { icon: 'check.svg', text: 'Preselección de todos los asientos', alt: 'Check' },
          { icon: 'check.svg', text: 'Acumula 300% de millas ConnectMiles', alt: 'Check' },
        ],
        others: [
          { icon: 'check.svg', text: 'Cambios limitados sin penalidad', alt: 'Check' },
          { icon: 'check.svg', text: 'Tarifa reembolsable', alt: 'Check' },
        ],
        colorHeader: '#121212'
      }
    ];
  }
}
