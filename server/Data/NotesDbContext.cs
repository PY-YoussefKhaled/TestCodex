using Microsoft.EntityFrameworkCore;
using NoteApp.Api.Models;

namespace NoteApp.Api.Data;

public class NotesDbContext(DbContextOptions<NotesDbContext> options) : DbContext(options)
{
    public DbSet<Note> Notes => Set<Note>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Note>(entity =>
        {
            entity.Property(note => note.Title)
                .HasMaxLength(120)
                .IsRequired();

            entity.Property(note => note.Content)
                .IsRequired();

            entity.Property(note => note.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .ValueGeneratedOnAdd();

            entity.Property(note => note.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .ValueGeneratedOnAddOrUpdate();
        });
    }
}
