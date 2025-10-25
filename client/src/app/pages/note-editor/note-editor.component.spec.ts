import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NoteEditorComponent } from './note-editor.component';
import { NoteService } from '../../core/note.service';

class MockNoteService {
  create() {
    return of({ id: 1, title: 'Mock', content: 'Mock', createdAt: '', updatedAt: '' });
  }

  get() {
    return of({ id: 1, title: 'Mock', content: 'Mock', createdAt: '', updatedAt: '' });
  }

  update() {
    return of(void 0);
  }

  delete() {
    return of(void 0);
  }
}

describe('NoteEditorComponent', () => {
  let component: NoteEditorComponent;
  let fixture: ComponentFixture<NoteEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoteEditorComponent],
      providers: [
        { provide: NoteService, useClass: MockNoteService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({}))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
