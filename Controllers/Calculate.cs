using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using CalculateApi.Models;
using System.Linq;


namespace arithmetic_operation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculateController : ControllerBase
    {
        private readonly CalculateContext _context;

        public CalculateController(CalculateContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Calculate>> Post(Calculate calculate)
        {
            _context.calculates.Add(calculate);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCalculate), new { id = calculate.Id }, calculate);
        }

        [HttpGet]
        public IEnumerable<Calculate> GetCalculateList()
        {
            var calculate = _context.calculates.Reverse();

            return calculate;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Calculate>> GetCalculate(long id)
        {
            var calculate = await _context.calculates.FindAsync(id);

            if (calculate == null)
            {
                return NotFound();
            }

            return calculate;
        }
    }
}
