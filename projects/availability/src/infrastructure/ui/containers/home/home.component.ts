import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { NewDestinyComponent } from '../../components/new-destiny/new-destiny.component';
import { BestFlightsComponent } from '../../components/best-flights/best-flights.component';
import { RecomendationsSectionComponent } from '../../components/recomendations-section/recomendations-section.component';
import { PromptionsSectionComponent } from '../../components/promptions-section/promptions-section.component';
import { FormUseCase } from '../../../../application/form.usecase';
import { IFormFlight } from '../../../../domain/model/flight.model';

@Component({
  selector: 'lib-home',
  imports: [
    HeroComponent,
    NewDestinyComponent,
    BestFlightsComponent,
    RecomendationsSectionComponent,
    PromptionsSectionComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _formUsecase = inject(FormUseCase);

  dataForm: IFormFlight;

  handleFormSubmit(data: IFormFlight) {
    this.dataForm = data;
    this._formUsecase.execute(this.dataForm);
  }

  ngOnInit() {
    this._formUsecase.initSubscriptions();
  }

  ngOnDestroy() {
    this._formUsecase.destroySubscriptions();
  }
}
