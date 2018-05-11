using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Web.Data
{
    public class Result<TEntity>
    {
        public bool Success => Status == ResultType.Success;
        public TEntity Entity { get; set; }
        public string Error { get; set; }
        public ResultType Status { get; set; }


        private Result() {}

        public static Result<TEntity> CreateSuccessResult(TEntity entity) {
            return new Result<TEntity>
            {
                Status = ResultType.Success,
                Entity = entity
            };
        }

        public static Result<TEntity> CreateFailResult(ResultType status, string error) {
            return new Result<TEntity>
            {
                Status = status,
                Error = error
            };
        }

        public static Result<TEntity> CreateFailResult(Exception ex) {
            var (status, error) = ParseError(ex);

            return new Result<TEntity> {
                Status = status,
                Error = error
            };
        }

        public static (ResultType, string) ParseError(Exception ex) {
            if (ex is DbUpdateException && ex.InnerException is Npgsql.PostgresException pgsqlException) {
                switch (pgsqlException.SqlState) {
                    case PgsqlStatusCodes.FOREIGN_KEY_VIOLATION:
                        return (ResultType.NotFound, "Not found");
                    case PgsqlStatusCodes.UNIQUE_VIOLATION:
                        return (ResultType.Invalid, "ERROR");
                }
            }

            return (ResultType.Invalid, "asdasd");
        }

    }
}
