using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteApp.Api.Data;
using NoteApp.Api.DTOs;
using NoteApp.Api.Models;

namespace NoteApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotesController(NotesDbContext dbContext) : ControllerBase
{
    private readonly NotesDbContext _dbContext = dbContext;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<NoteDto>>> GetNotes(CancellationToken cancellationToken)
    {
        var notes = await _dbContext.Notes
            .OrderByDescending(n => n.UpdatedAt)
            .Select(n => new NoteDto(n.Id, n.Title, n.Content, n.CreatedAt, n.UpdatedAt))
            .ToListAsync(cancellationToken);

        return Ok(notes);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<NoteDto>> GetNote(int id, CancellationToken cancellationToken)
    {
        var note = await _dbContext.Notes
            .Where(n => n.Id == id)
            .Select(n => new NoteDto(n.Id, n.Title, n.Content, n.CreatedAt, n.UpdatedAt))
            .FirstOrDefaultAsync(cancellationToken);

        if (note is null)
        {
            return NotFound();
        }

        return Ok(note);
    }

    [HttpPost]
    public async Task<ActionResult<NoteDto>> CreateNote(NoteCreateDto dto, CancellationToken cancellationToken)
    {
        var note = new Note
        {
            Title = dto.Title,
            Content = dto.Content,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _dbContext.Notes.Add(note);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var result = new NoteDto(note.Id, note.Title, note.Content, note.CreatedAt, note.UpdatedAt);
        return CreatedAtAction(nameof(GetNote), new { id = note.Id }, result);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateNote(int id, NoteUpdateDto dto, CancellationToken cancellationToken)
    {
        var note = await _dbContext.Notes.FirstOrDefaultAsync(n => n.Id == id, cancellationToken);
        if (note is null)
        {
            return NotFound();
        }

        note.Title = dto.Title;
        note.Content = dto.Content;
        note.UpdatedAt = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteNote(int id, CancellationToken cancellationToken)
    {
        var note = await _dbContext.Notes.FirstOrDefaultAsync(n => n.Id == id, cancellationToken);
        if (note is null)
        {
            return NotFound();
        }

        _dbContext.Notes.Remove(note);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return NoContent();
    }
}
