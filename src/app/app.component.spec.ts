import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {UiModule} from "./ui/ui.module";
import {CoreModule} from "./core/core.module";
import {TransactionsModule} from "./transactions/transactions.module";
import {BsModalRef, BsModalService, ModalModule} from "ngx-bootstrap/modal";
import {BbUIModule} from "./bb-ui/bb-ui.module";
import {LogoComponent} from "./bb-ui/components/logo/logo.component";
import {DebugElement} from "@angular/core";
import {findByCss, findEl} from "../spec-utils";
import {By} from "@angular/platform-browser";
import {AddTransactionFormComponent} from "./transactions/components/add-transaction-form/add-transaction-form.component";
import {ReviewTransferModalComponent} from "./transactions/components/review-transfer-modal/review-transfer-modal.component";
import {SubmitButtonComponent} from "./bb-ui/components/submit-button/submit-button.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let debugEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoreModule,
        BrowserAnimationsModule,
        BbUIModule,
        UiModule,
        TransactionsModule,
        ModalModule.forRoot(),
        HttpClientModule,
      ],
      declarations: [
        AppComponent,
        LogoComponent,
        AddTransactionFormComponent,
        ReviewTransferModalComponent,
        SubmitButtonComponent,
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

  // TODO: Test incomplete:
  //  1. Form errors are not correctly updated.
  xit(`does not open review transaction modal on form if there are errors`, fakeAsync(() => {
    const addTransactionFromComponentDebugEl: DebugElement = debugEl.query(By.directive(AddTransactionFormComponent));
    const addTransactionFromComponent = addTransactionFromComponentDebugEl.componentInstance;
    spyOn(addTransactionFromComponent, 'openModalWithComponent').and.callThrough();
    const form = addTransactionFromComponent.createForm();
    const submitBtnDebugEl: DebugElement = findEl(fixture, 'submitButton');
    submitBtnDebugEl.triggerEventHandler('click', {});
    fixture.detectChanges();
    tick(250);

    const modal: DebugElement = debugEl.query(By.directive(ReviewTransferModalComponent));

    expect(form.valid).toEqual(false);
    // expect(form.errors).toEqual({});
    expect(addTransactionFromComponent.openModalWithComponent).not.toHaveBeenCalled();
    expect(modal).toBeFalsy();
  }));

  // TODO: Test is incomplete:
  //  1. Form is not valid?
  //  2. ngx-bootstrap modal is not opening.
  xit('opens review transaction modal on form submit', fakeAsync(() => {
    const addTransactionFromComponentDebugEl: DebugElement = debugEl.query(By.directive(AddTransactionFormComponent));
    const addTransactionFromComponent = addTransactionFromComponentDebugEl.componentInstance;
    spyOn(addTransactionFromComponent, 'openModalWithComponent').and.callThrough();
    const form = addTransactionFromComponent.createForm();
    addTransactionFromComponent.targetAccountNameControl.setValue('Foo');
    addTransactionFromComponent.amountControl.setValue(100);
    const submitBtnDebugEl: DebugElement = findEl(fixture, 'submitButton');
    submitBtnDebugEl.triggerEventHandler('click', {});

    fixture.detectChanges();
    tick(250);

    const modal: DebugElement = debugEl.query(By.directive(ReviewTransferModalComponent));

    // expect(form.valid).toBeTruthy();
    expect(form.errors).toEqual(null);
    expect(addTransactionFromComponent.openModalWithComponent).toHaveBeenCalled();
    // expect(modal).toBeTruthy();
  }));
});
