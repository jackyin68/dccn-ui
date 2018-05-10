import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaCardValueComponent } from './meta-card-value.component';
import { SharedModule } from '../../../../../shared.module';

describe('MetaCardValueComponent', () => {
  let component: MetaCardValueComponent;
  let fixture: ComponentFixture<MetaCardValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaCardValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
