using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataServiceDraft
{
    internal class PageParser
    {
        private readonly HtmlDocument _html = new HtmlDocument();

        public void GetPizzas(string page)
        {
            _html.LoadHtml(page);

            var pizzaElement = _html.DocumentNode.SelectSingleNode("//ul[@class='goods__list']/*");

            var pizza = CreatePizzaFromHtml(pizzaElement);
        }

        private Pizza CreatePizzaFromHtml(HtmlNode html)
        {
            var title = html.SelectSingleNode(".//div[@class='goods__list__text']").InnerText;

            return null;
        }
    }
}
