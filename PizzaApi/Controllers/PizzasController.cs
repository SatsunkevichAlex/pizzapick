using Common.Models;
using DatabaseInserter;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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
                .Distinct()
                .ToList();
            return Json(result);
        }

        [HttpGet]
        [Route("/pizzas-sidebar")]
        public IActionResult GetPizzasSideBar()
        {
            var result = _appContext.Pizzas
                .ToList()
                .GroupBy(it => it.Name)
                .Select(g => g.First())
                .ToList();
            return Json(result);
        }

        [HttpGet]
        [Route("/producers")]
        public IActionResult GetProducers()
        {
            var result = _appContext.Pizzas
                .Select(it => new Producer
                {
                    Name = it.Producer.Name,
                    LogoUrl = it.Producer.LogoUrl,
                    Link = it.Producer.Link
                })
                .Distinct()
                .ToList();
            return Json(result);
        }

        [HttpGet]
        [Route("/pizzas-by-producers")]
        public IActionResult GetPizzas(Producer producer)
        {
            var result = _appContext.Pizzas
                .Where(it => it.Producer.Name == producer.Name)
                .GroupBy(it => it.Name)
                .Select(g => g.First())
                .ToList();

            return Json(result);
        }

        [HttpGet]
        [Route("/pizzas-by-producer-name")]
        public IActionResult GetPizzas(string producerName)
        {
            var result = _appContext.Pizzas
                .Where(it => it.Producer.Name == producerName)
                .ToList()
                .GroupBy(it => it.Name)
                .Select(g => g.First())
                .ToList();

            return Json(result);
        }

        [HttpGet]
        [Route("/pizza")]
        public IActionResult GetPizza(string name, double price)
        {
            var result = _appContext.Pizzas
                .ToList()
                .First(it => it.Price == price &&
                  it.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
            return Json(result);
        }

        [HttpPost]
        [Route("/get-dougns-for-pizza")]
        public IActionResult GetDougnsForPizza(Pizza pizza)
        {
            var pizzas = _appContext.Pizzas
                .ToList()
                .Where(it => it.Producer.Name.Equals(pizza.Producer.Name, StringComparison.OrdinalIgnoreCase) &&
                       it.Name.Equals(pizza.Name, StringComparison.OrdinalIgnoreCase));
            string[] dougns = GetDoughns(pizzas);
            return Json(dougns);
        }

        [HttpPost]
        [Route("/get-crusts-for-pizza")]
        public IActionResult GetCrustsForPizza(Pizza pizza)
        {
            var pizzas = _appContext.Pizzas
                .ToList()
                .Where(it => it.Producer.Name.Equals(pizza.Producer.Name, StringComparison.OrdinalIgnoreCase) &&
                       it.Name.Equals(pizza.Name, StringComparison.OrdinalIgnoreCase));
            string[] crusts = GetCrusts(pizzas);
            return Json(crusts);
        }

        [HttpPost]
        [Route("/get-diameters-for-pizza")]
        public IActionResult GetDiametersForPizza(Pizza pizza)
        {
            var pizzas = _appContext.Pizzas
                .ToList()
                .Where(it =>
                       it.Producer.Name.Equals(pizza.Producer.Name, StringComparison.OrdinalIgnoreCase) &&
                       it.Name.Equals(pizza.Name, StringComparison.OrdinalIgnoreCase));
            int[] diameters = GetDiameters(pizzas);
            return Json(diameters);
        }

        [HttpPost]
        [Route("/get-price-for-pizza")]
        public IActionResult GetPriceForPizza(Pizza pizza)
        {
            var price = _appContext.Pizzas
                .ToList()
                .Where(it => it.Producer.Name.Equals(pizza.Producer.Name, StringComparison.OrdinalIgnoreCase))
                .Where(it => it.Name.Equals(pizza.Name, StringComparison.OrdinalIgnoreCase))
                .Where(it => it.Params.IsCheesSide == pizza.Params.IsCheesSide)
                .Where(it => it.Params.IsHotDogSide == pizza.Params.IsHotDogSide)
                .Where(it => it.Params.IsThin == pizza.Params.IsThin)
                .Where(it => it.Params.Diameter == pizza.Params.Diameter)
                .Select(it => it.Price);

            return Json(price);
        }

        [HttpGet]
        [Route("/get-price-for-config")]
        public IActionResult GetPriceForConfig(
            int diameter,
            string crust,
            string dougn,
            string pizzaName,
            string producerName
            )
        {
            bool isCheese = crust.Equals("Сырный борт", StringComparison.OrdinalIgnoreCase);
            bool isHotDogSide = crust.Equals("Хот-дог борт", StringComparison.OrdinalIgnoreCase);
            bool isThin = dougn.Equals("Тонкое", StringComparison.OrdinalIgnoreCase);

            var price = _appContext.Pizzas
                .ToList()
                .Where(it => it.Name.Equals(pizzaName, StringComparison.OrdinalIgnoreCase))
                .Where(it => it.Producer.Name.Equals(producerName, StringComparison.OrdinalIgnoreCase))
                .Where(it => it.Params.Diameter == diameter)
                .Where(it => it.Params.IsCheesSide == isCheese)
                .Where(it => it.Params.IsHotDogSide == isHotDogSide)
                .Where(it => it.Params.IsThin == isThin)
                .Select(it => it.Price);

            return Json(price);
        }

        private int[] GetDiameters(IEnumerable<Pizza> pizzas)
        {
            return pizzas
                .Select(it => it.Params.Diameter)
                .Distinct()
                .ToArray();
        }

        private string[] GetCrusts(IEnumerable<Pizza> pizzas)
        {
            List<string> crusts = new List<string>();
            foreach (Pizza pizza in pizzas)
            {
                crusts.Add("Классический");
                if (pizza.Params.IsCheesSide)
                {
                    crusts.Add("Сырный борт");
                }
                if (pizza.Params.IsHotDogSide)
                {
                    crusts.Add("Хот-дог борт");
                }
            }
            var result = crusts
                .Where(it => !string.IsNullOrEmpty(it))
                .Distinct()
                .ToArray();
            return result;
        }

        private string[] GetDoughns(IEnumerable<Pizza> pizzas)
        {
            return pizzas.
                Select(it => it.Params.IsThin ?
                "Тонкое" : "Классическое")
                .Distinct()
                .ToArray();
        }
    }
}
