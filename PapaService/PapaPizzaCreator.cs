﻿using Common.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PapaService
{
    internal class PapaPizzaCreator
    {
        private const string PAPA_LOGO_URL = "https://lh3.googleusercontent.com/mGNsoWq-phTFXgQpoGTFCncDSqxEIjOHObBxX9p7iHMhqm_gHy3ohXykmrawUbQRXQ";
        private const string SITE_LINK = "https://new.papajohns.by/";

        internal List<Pizza> CreateVariations(JObject pizzaData)
        {
            var result = new List<Pizza>();

            var title = pizzaData.GetValue("name").ToString();
            var content = pizzaData.GetValue("data")
                .ToString().Split(',')
                .Select(it => it.Trim().ToLower()).ToList();
            var producer = "Папа Джонс";
            var imageLink = 
                pizzaData["variations"][0]["image_list_webp"].ToString();

            foreach (var variation in pizzaData["variations"])
            {
                var pizza = new Pizza
                {
                    Composition = new Composition
                    {
                        Content = content
                    },
                    Name = title,
                    Producer = new Producer
                    {
                        Name = producer,
                        LogoUrl = PAPA_LOGO_URL,
                        Link = SITE_LINK
                    },
                    Params = new Params
                    {
                        Diameter = GetDiameter(variation),
                        IsCheesSide = IsCheese(variation),
                        IsHotDogSide = false,
                        IsThin = IsThin(variation)
                    },
                    ImageUrl = imageLink,
                    Price = GetPrice(variation)
                };
                result.Add(pizza);
            }

            return result;
        }

        private int GetDiameter(JToken variation)
        {
            return variation.Value<int>("diameter");
        }

        private bool IsCheese(JToken variation)
        {
            var crust = variation.Value<string>("stuffed_crust")
                .ToString().ToString();
            return crust switch
            {
                "none" => false,
                "cheese" => true,
                _ => throw new InvalidOperationException("Crust is not recognized"),
            };
        }

        private bool IsThin(JToken variation)
        {
            var dough = variation.Value<string>("dough")
                .ToString().ToLower();
            return dough switch
            {
                "традиционное" => false,
                "тонкое" => true,
                _ => throw new InvalidOperationException("dough type is not recognized"),
            };
        }

        private double GetPrice(JToken variation)
        {
            return variation.Value<double>("price");
        }
    }
}
