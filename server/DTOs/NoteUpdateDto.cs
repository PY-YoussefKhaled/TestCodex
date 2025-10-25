using System.ComponentModel.DataAnnotations;

namespace NoteApp.Api.DTOs;

public class NoteUpdateDto
{
    [Required]
    [MaxLength(120)]
    public required string Title { get; set; }

    [Required]
    public required string Content { get; set; }
}
