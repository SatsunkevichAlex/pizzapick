using Common.Models;
using DatabaseInserter;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace PizzaApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PizzasController : Controller
    {
        private readonly ApplicationContext _appContext;

        public PizzasController(ApplicationContext appContext)
        {
            _appContext = appContext;
        }

        [HttpGet]
        [Route("/")]
        public IActionResult Index()
        {
            var result = "Hello from PizzaApi";
            return Json(result);
        }

        [HttpGet]
        [Route("/pizzas")]
        public IActionResult GetPizzas()
        {
            var result = _appContext.Pizzas
                .ToList();
            return Json(result);
        }

        [HttpGet]
        [Route("/producers")]
        public IActionResult GetProducers()
        {
            var result = _appContext.Pizzas
                .Select(it => it.Producer.Name)
                .Distinct()
                .ToList();
            return Json(result);
        }
    }
}
