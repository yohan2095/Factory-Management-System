//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Project_1_Technion
{
    using System;
    using System.Collections.Generic;
    
    public partial class shift
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public shift()
        {
            this.employee_shift = new HashSet<employee_shift>();
        }
    
        public int ID { get; set; }
        public System.DateTime date { get; set; }
        public int startTime { get; set; }
        public int endTime { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<employee_shift> employee_shift { get; set; }
    }
}