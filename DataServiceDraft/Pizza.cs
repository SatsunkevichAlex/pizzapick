using System.Collections.Generic;

namespace DataServiceDraft
{
    internal class Pizza
    {
        public string Size { get; set; }
        public double Cost { get; set; }
        public double Mass { get; set; }
        public bool IsThin { get; set; }
        public List<string> Content { get; set; }
        public string Name { get; set; }
    }
}