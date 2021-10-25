import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {UiModule} from "./ui/ui.module";
import {CoreModule} from "./core/core.module";
import {TransactionsModule} from "./transactions/transactions.module";
import {BsModalRef, BsModalService, ModalModule} from "ngx-bootstrap/modal";
import {BbUIModule} from "./bb-ui/bb-ui.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {LogoComponent} from "./bb-ui/components/logo/logo.component";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoreModule,
        BbUIModule,
        UiModule,
        TransactionsModule,
        ModalModule.forRoot(),
      ],
      declarations: [
        AppComponent,
        LogoComponent,
      ],
      providers: [
        BsModalService,
        BsModalRef,
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'peachtree-bank'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('peachtree-bank');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // TODO: Do we need this check?
    expect(compiled.querySelector('.content span')?.textContent).toContain('peachtree-bank app is running!');
  });
});
