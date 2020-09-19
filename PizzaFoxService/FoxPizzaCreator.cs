using Common.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace PizzaFoxDataService
{
    internal class FoxPizzaCreator
    {
        private const string CONSUMER = "Пицца Лисица";
        private const string ANONCE = "anonce";
        private const string TITLE = "title";
        private const string MEDIUM_SIZE_NAME = "Стандарт";
        private const string BIG_SIZE_NAME = "Большая";
        private const string THIN_SIZE_NAME = "На тонком тесте";

        private const string THIN_PIRCE = "thin_price";
        private const string MED_THIN_CALORIES = "medium_thin_calories";
        private const string THIN_DIAMETER = "thin_diameter";
        private const string THIN_WEIGTH = "thin_weight";

        private const string MEDIUM_CALORIES = "medium_thin_calories";
        private const string MEDIUM_DIAMETER = "medium_diameter";
        private const string MEDIUM_WEIGHT = "medium_weight";
        private const string MEDIUM_PRICE = "medium_price";

        private const string BIG_CALORIES = "big_thin_calories";
        private const string BIG_DIAMETER = "big_diameter";
        private const string BIG_WEIGHT = "big_weight";
        private const string BIG_PRICE = "big_price";

        private const string FOX_LOGO_URL = "https://e-vent.by/_files/pic/pzz.png";
        private const string FOX_LINK = "https://pzz.by/";

        internal List<Pizza> CreatePizzaVariations(JToken pizzaData)
        {
            var result = new List<Pizza>();

            if (IsThin(pizzaData))
            {
                var thinPizza = CreateThinPizza(pizzaData);
                result.Add(thinPizza);
            }
            var mediumPizza = CreateMediumPizza(pizzaData);
            var bigPizza = CreateBigPizza(pizzaData);
            result.Add(mediumPizza);
            result.Add(bigPizza);

            return result;
        }

        private Pizza CreateBigPizza(JToken pizzaData)
        {
            var name = pizzaData.Children<JProperty>().SingleOrDefault(it => it.Name == TITLE).Value.ToString();
            var content = GetPizzaContent(pizzaData);
            var sizeName = BIG_SIZE_NAME;
            var photoPath = GetPizzaImage(pizzaData);

            var bigData = pizzaData.Children<JProperty>().Where(it => it.Name.Contains("big"));

            var calories = GetBigPizzaCalories(bigData);
            var diameter = GetBigPizzaDiameter(bigData);
            var mass = GetBigPizzaMass(bigData);
            var price = GetBigPizzaPrice(bigData);

            var composition = new Composition
            {
                Content = content
            };
            var parameters = new Params
            {
                Diameter = diameter,
                IsCheesSide = false,
                IsHotDogSide = false,
                IsThin = false,
                Mass = mass,
                SizeName = sizeName               
            };
            var producer = new Producer
            {
                Name = CONSUMER,
                LogoUrl = FOX_LOGO_URL,
                Link = FOX_LINK
            };

            Pizza bigPizza = new Pizza(
                name,
                composition,
                producer,
                parameters,
                price,
                photoPath
                );

            return bigPizza;
        }

        private Pizza CreateMediumPizza(JToken pizzaData)
        {
            var name = pizzaData.Children<JProperty>().SingleOrDefault(it => it.Name == TITLE).Value.ToString();
            var content = GetPizzaContent(pizzaData);
            var sizeName = MEDIUM_SIZE_NAME;
            var photoPath = GetPizzaImage(pizzaData);

            var mediumData = pizzaData.Children<JProperty>().Where(it => it.Name.Contains("medium"));

            var calories = GetMediumPizzaCalories(mediumData);
            var diameter = GetMediumPizzaDiameter(mediumData);
            var mass = GetMediumPizzaMass(mediumData);
            var price = GetMediumPizzaPrice(mediumData);

            var composition = new Composition
            {
                Content = content
            };
            var parameters = new Params
            {
                Diameter = diameter,
                IsCheesSide = false,
                IsHotDogSide = false,
                IsThin = false,
                Mass = mass,
                SizeName = sizeName
            };
            var producer = new Producer
            {
                Name = CONSUMER,
                LogoUrl = FOX_LOGO_URL,
                Link = FOX_LINK
            };

            Pizza mediumPizza = new Pizza(
                name,
                composition,
                producer,
                parameters,
                price,
                photoPath
                );

            return mediumPizza;
        }

        private Pizza CreateThinPizza(JToken pizzaData)
        {
            var name = pizzaData.Children<JProperty>().SingleOrDefault(it => it.Name == TITLE).Value.ToString();
            var content = GetPizzaContent(pizzaData);
            var sizeName = THIN_SIZE_NAME;
            var photoPath = GetPizzaImage(pizzaData);

            var thinData = pizzaData.Children<JProperty>().Where(it => it.Name.Contains("thin"));

            var calories = GetThinPizzaCalories(thinData);
            var diameter = GetThinPizzaDiameter(thinData);
            var mass = GetThinPizzaMass(thinData);
            var price = GetThinPizzaPrice(thinData);            

            var composition = new Composition
            {
                Content = content
            };
            var parameters = new Params
            {
                Diameter = diameter,
                IsCheesSide = false,
                IsHotDogSide = false,
                IsThin = true,
                Mass = mass,
                SizeName = sizeName
            };
            var producer = new Producer
            {
                Name = CONSUMER,
                LogoUrl = FOX_LOGO_URL,
                Link = FOX_LINK
            };

            Pizza thinPizza = new Pizza(
                name,
                composition,
                producer,
                parameters,
                price,
                photoPath
                );

            return thinPizza;
        }

        private bool IsThin(JToken pizzaData)
        {
            return pizzaData
                .Children<JProperty>()
                .SingleOrDefault(it => it.Name == "is_thin")
                .Value.ToString() == "1" ? true : false;
        }

        private int GetThinPizzaCalories(IEnumerable<JProperty> pizzaData)
        {
            return int.Parse
                (pizzaData.SingleOrDefault(it => it.Name == MED_THIN_CALORIES)
                .Value.ToString());
        }

        private int GetThinPizzaDiameter(IEnumerable<JProperty> pizzaData)
        {
            return int.Parse(
                pizzaData.SingleOrDefault(it => it.Name == THIN_DIAMETER)
                .Value.ToString().Split(' ')[0]);
        }

        private int GetThinPizzaMass(IEnumerable<JProperty> pizzaData)
        {
            string mass = pizzaData.SingleOrDefault(it =>
                it.Name == THIN_WEIGTH).Value.ToString();
            var regex = Regex.Matches(mass, @"\d\,\d")
                .Select(it => it.Value.Replace(',', '.'));
            var result = 1000 * (double.Parse(regex.First())
                + double.Parse(regex.Last())) / 2;
            return Convert.ToInt32(result);
        }

        private List<string> GetPizzaContent(JToken pizzaData)
        {
            var result = pizzaData.Children<JProperty>()
                .SingleOrDefault(it => it.Name == ANONCE).Value.ToString()
                .Split(',').Select(it => it.Trim()).ToList();
            return result;
        }

        private double GetThinPizzaPrice(IEnumerable<JProperty> pizzaData)
        {
            const int denominationValue = 10000;
            string oldPrice = pizzaData.SingleOrDefault(it =>
                it.Name == THIN_PIRCE).Value.ToString();
            double newPrice = double.Parse(oldPrice) / denominationValue;
            return newPrice;
        }

        private int GetMediumPizzaCalories(IEnumerable<JProperty> pizzaData)
        {
            return int.Parse
                (pizzaData.SingleOrDefault(it => it.Name == MEDIUM_CALORIES)
                .Value.ToString());
        }

        private int GetMediumPizzaDiameter(IEnumerable<JProperty> pizzaData)
        {
            return int.Parse(
                pizzaData.SingleOrDefault(it => it.Name == MEDIUM_DIAMETER)
                .Value.ToString().Split(' ')[0]);
        }

        private int GetMediumPizzaMass(IEnumerable<JProperty> pizzaData)
        {
            string mass = pizzaData.SingleOrDefault(it =>
                it.Name == MEDIUM_WEIGHT).Value.ToString();
            var regex = Regex.Matches(mass, @"\d\,\d")
                .Select(it => it.Value.Replace(',', '.'));
            var result = 1000 * (double.Parse(regex.First())
                + double.Parse(regex.Last())) / 2;
            return Convert.ToInt32(Math.Round(result, 0));
        }

        private double GetMediumPizzaPrice(IEnumerable<JProperty> pizzaData)
        {
            const int denominationValue = 10000;
            string oldPrice = pizzaData.SingleOrDefault(it =>
                it.Name == MEDIUM_PRICE).Value.ToString();
            double newPrice = double.Parse(oldPrice) / denominationValue;
            return newPrice;
        }

        private int GetBigPizzaCalories(IEnumerable<JProperty> pizzaData)
        {
            return int.Parse
                (pizzaData.SingleOrDefault(it => it.Name == BIG_CALORIES)
                .Value.ToString());
        }

        private int GetBigPizzaDiameter(IEnumerable<JProperty> pizzaData)
        {
            return int.Parse(
                pizzaData.SingleOrDefault(it => it.Name == BIG_DIAMETER)
                .Value.ToString().Split(' ')[0]);
        }

        private int GetBigPizzaMass(IEnumerable<JProperty> pizzaData)
        {
            string mass = pizzaData.SingleOrDefault(it =>
                it.Name == BIG_WEIGHT).Value.ToString();
            var regex = Regex.Matches(mass, @"\d\,\d")
                .Select(it => it.Value.Replace(',', '.'));
            var result = 1000 * (double.Parse(regex.First())
                + double.Parse(regex.Last())) / 2;
            return Convert.ToInt32(Math.Round(result, 0));
        }

        private double GetBigPizzaPrice(IEnumerable<JProperty> pizzaData)
        {
            const int denominationValue = 10000;
            string oldPrice = pizzaData.SingleOrDefault(it =>
                it.Name == BIG_PRICE).Value.ToString();
            double newPrice = double.Parse(oldPrice) / denominationValue;
            return newPrice;
        }

        private string GetPizzaImage(JToken pizzaData)
        {
            return pizzaData
                .Children<JProperty>()
                .SingleOrDefault(it => 
                    it.Name == "photo1").Value.ToString();
        }
    }
}
