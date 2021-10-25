import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {UiModule} from "./ui/ui.module";
import {CoreModule} from "./core/core.module";
import {TransactionsModule} from "./transactions/transactions.module";
import {BsModalRef, BsModalService, ModalModule} from "ngx-bootstrap/modal";
import {BbUIModule} from "./bb-ui/bb-ui.module";
import {LogoComponent} from "./bb-ui/components/logo/logo.component";
import {DebugElement} from "@angular/core";
import {findByCss} from "../spec-utils";
import {By} from "@angular/platform-browser";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let debugEl: DebugElement;

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
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
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

  it('renders header element', () => {
    const header = findByCss(fixture, 'app-topbar > header');
    expect(header).toBeTruthy();
  });

  it('renders footer element', () => {
    const footer = findByCss(fixture, 'app-footer > footer');
    expect(footer).toBeTruthy();

    const footerText = footer.query(By.css('p > em > strong')).nativeElement.innerText;
    expect(footerText).toBe('Peachtree Bank');
  });

  it('is rendered with correct image', () => {
    const logo = findByCss(fixture, 'img[src="assets/images/logo.jpg"]');
    expect(logo).toBeTruthy();
    expect(logo.nativeElement.alt).toBe('Peachtree Bank');
  });
});
