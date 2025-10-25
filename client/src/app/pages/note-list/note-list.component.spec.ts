import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NoteListComponent } from './note-list.component';
import { NoteService } from '../../core/note.service';

class MockNoteService {
  notes = signal([]);
  loadAll() {
    return of([]);
  }
}

describe('NoteListComponent', () => {
  let component: NoteListComponent;
  let fixture: ComponentFixture<NoteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NoteListComponent],
      providers: [{ provide: NoteService, useClass: MockNoteService }]
    }).compileComponents();

    fixture = TestBed.createComponent(NoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
