using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Web.Data.Migrations
{
    public partial class MakeEventScoreUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_EventScores_EventItemId",
                table: "EventScores");

            migrationBuilder.CreateIndex(
                name: "IX_EventScores_EventItemId_EventScoreTypeId_EventParticipantUserId",
                table: "EventScores",
                columns: new[] { "EventItemId", "EventScoreTypeId", "EventParticipantUserId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_EventScores_EventItemId_EventScoreTypeId_EventParticipantUserId",
                table: "EventScores");

            migrationBuilder.CreateIndex(
                name: "IX_EventScores_EventItemId",
                table: "EventScores",
                column: "EventItemId");
        }
    }
}
