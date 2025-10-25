import { Routes } from '@angular/router';
import { NoteListComponent } from './pages/note-list/note-list.component';
import { NoteEditorComponent } from './pages/note-editor/note-editor.component';

export const routes: Routes = [
  {
    path: '',
    component: NoteListComponent
  },
  {
    path: 'notes/new',
    component: NoteEditorComponent
  },
  {
    path: 'notes/:id',
    component: NoteEditorComponent
  }
];
