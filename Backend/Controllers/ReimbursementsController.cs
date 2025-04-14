using Microsoft.AspNetCore.Mvc;
using ReimbursementAPI.Data;
using ReimbursementAPI.Models;

namespace ReimbursementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReimbursementsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ReimbursementsController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpPost]
        public async Task<IActionResult> Submit([FromForm] ReimbursementForm form)
        {
            if (form.Receipt == null || form.Receipt.Length == 0)
                return BadRequest("Receipt file is required.");

            var uploadsFolder = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads");
            Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}_{form.Receipt.FileName}";
            var fullPath = Path.Combine(uploadsFolder, fileName);

            // Save file
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await form.Receipt.CopyToAsync(stream);
            }

            // Save relative path
            var relativePath = $"/uploads/{fileName}";

            var reimbursement = new Reimbursement
            {
                Date = form.Date,
                Amount = form.Amount,
                Description = form.Description,
                ReceiptPath = relativePath
            };
            _context.Reimbursements.Add(reimbursement);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Reimbursement submitted", id = reimbursement.Id });
        }
    }

    public class ReimbursementForm
    {
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; } = string.Empty;
        public IFormFile Receipt { get; set; }
    }
}