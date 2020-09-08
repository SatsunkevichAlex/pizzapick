using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Common.Models
{
    public class Composition
    {
        [Key]
        public int Id { get; set; }
        public List<string> Content { get; set; }

        public int PizzaId { get; set; }
        public Pizza Pizza { get; set; }
    }
}
