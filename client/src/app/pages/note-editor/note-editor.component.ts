import { NgIf } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { NoteService } from '../../core/note.service';
import { Note } from '../../shared/models/note.model';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss']
})
export class NoteEditorComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly noteService = inject(NoteService);

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(120)]],
    content: ['', [Validators.required]]
  });

  private currentNote?: Note;
  readonly isEditMode = computed(() => !!this.currentNote);

  constructor() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (!id) {
            this.currentNote = undefined;
            this.form.reset({ title: '', content: '' });
            return of(null);
          }

          const parsedId = Number(id);
          if (Number.isNaN(parsedId)) {
            return of(null);
          }

          return this.noteService.get(parsedId);
        })
      )
      .subscribe((note) => {
        if (note) {
          this.currentNote = note;
          this.form.patchValue({
            title: note.title,
            content: note.content
          });
        }
      });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();

    if (this.currentNote) {
      this.noteService.update(this.currentNote.id, payload).subscribe(() => {
        this.router.navigate(['/']);
      });
      return;
    }

    this.noteService.create(payload).subscribe((note) => {
      this.router.navigate(['/notes', note.id]);
    });
  }

  delete(): void {
    if (!this.currentNote) {
      return;
    }

    this.noteService.delete(this.currentNote.id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
