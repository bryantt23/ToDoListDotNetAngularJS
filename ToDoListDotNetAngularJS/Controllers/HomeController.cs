using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using ToDoListDotNetAngularJS.Models;

namespace ToDoListDotNetAngularJS.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpGet]
        public JsonResult GetEmployees()
        {
            List<Todos> todos = new List<Todos>();
            string connectionStr = ConfigurationManager
                .ConnectionStrings["connectionStr"].ConnectionString;
            using (SqlConnection con = new SqlConnection(connectionStr))
            {

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;
                cmd.CommandText = "spGetTodos";
                cmd.CommandType = CommandType.StoredProcedure;


                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    Todos todo = new Todos();
                    todo.Id = (int)rdr["Id"];
                    todo.Todo = (string)rdr["Todo"];
                    todos.Add(todo);
                }
                rdr.Close();
            }

            Todos[]res=todos.ToArray();
            return this.Json(todos, JsonRequestBehavior.AllowGet);
        }
    }
}