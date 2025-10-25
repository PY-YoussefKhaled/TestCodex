import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Note, NoteDraft } from '../shared/models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private readonly baseUrl = `${environment.apiUrl}/notes`;
  readonly notes = signal<Note[]>([]);

  constructor(private readonly http: HttpClient) {}

  loadAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl).pipe(tap((notes) => this.notes.set(notes)));
  }

  get(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.baseUrl}/${id}`);
  }

  create(note: NoteDraft): Observable<Note> {
    return this.http.post<Note>(this.baseUrl, note).pipe(
      tap((created) => this.notes.update((list) => [...list, created]))
    );
  }

  update(id: number, note: NoteDraft): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, note).pipe(
      tap(() => {
        this.notes.update((list) =>
          list.map((existing) => (existing.id === id ? { ...existing, ...note, updatedAt: new Date().toISOString() } : existing))
        );
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.notes.update((list) => list.filter((note) => note.id !== id)))
    );
  }
}
