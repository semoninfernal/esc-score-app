using SimpleMigrations;

namespace Web.Data.Migrations
{
    [Migration(201803192217)]
    public class _01803192217_Events : Migration
    {
        protected override void Up()
        {
            Execute(@"
                CREATE TABLE ""Events"" (
                    ""Id"" serial NOT NULL PRIMARY KEY,
                    ""Name"" varchar(256) NOT NULL,
                    ""OwnerId"" text REFERENCES ""AspNetUsers"",
                    ""Active"" boolean NOT NULL
                )
            ");

            Execute(@"
                CREATE TABLE ""EventParticipants"" (
                    ""UserId"" text NOT NULL,
                    ""EventId"" integer NOT NULL,
                    PRIMARY KEY(""UserId"", ""EventId"")
                )
            ");
        }

        protected override void Down()
        {
            Execute(@"DROP TABLE (""EventParticipants"", ""Event"")");
        }
    }
}
