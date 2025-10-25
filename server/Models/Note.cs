using System.ComponentModel.DataAnnotations;

namespace NoteApp.Api.Models;

public class Note
{
    public int Id { get; set; }

    [MaxLength(120)]
    public required string Title { get; set; }

    public required string Content { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}
