import { Component, OnInit, computed } from '@angular/core';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NoteService } from '../../core/note.service';
import { Note } from '../../shared/models/note.model';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [DatePipe, RouterLink, NgIf, NgFor],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  readonly notes = computed<Note[]>(() => this.noteService.notes());
  readonly hasNotes = computed(() => this.notes().length > 0);

  constructor(private readonly noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.loadAll().subscribe();
  }
}
