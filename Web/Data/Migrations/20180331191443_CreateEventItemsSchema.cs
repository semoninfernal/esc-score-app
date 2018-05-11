using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Web.Data.Migrations
{
    public partial class CreateEventItemsSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_AspNetUsers_OwnerId",
                table: "Events");

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Events",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.CreateTable(
                name: "EventItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Description = table.Column<string>(nullable: false),
                    EventId = table.Column<int>(nullable: false),
                    Image = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: false),
                    SortIndex = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventItems_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EventScoreTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    EventId = table.Column<int>(nullable: false),
                    Max = table.Column<int>(nullable: false),
                    Min = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventScoreTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventScoreTypes_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EventScores",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    EventItemId = table.Column<int>(nullable: false),
                    EventParticipantEventId = table.Column<int>(nullable: true),
                    EventParticipantUserId = table.Column<string>(nullable: true),
                    EventScoreTypeId = table.Column<int>(nullable: false),
                    Value = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventScores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventScores_EventItems_EventItemId",
                        column: x => x.EventItemId,
                        principalTable: "EventItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventScores_EventScoreTypes_EventScoreTypeId",
                        column: x => x.EventScoreTypeId,
                        principalTable: "EventScoreTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventScores_EventParticipants_EventParticipantEventId_EventParticipantUserId",
                        columns: x => new { x.EventParticipantEventId, x.EventParticipantUserId },
                        principalTable: "EventParticipants",
                        principalColumns: new[] { "EventId", "UserId" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventItems_EventId",
                table: "EventItems",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventItems_Name_EventId",
                table: "EventItems",
                columns: new[] { "Name", "EventId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EventScores_EventItemId",
                table: "EventScores",
                column: "EventItemId");

            migrationBuilder.CreateIndex(
                name: "IX_EventScores_EventScoreTypeId",
                table: "EventScores",
                column: "EventScoreTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EventScores_EventParticipantEventId_EventParticipantUserId",
                table: "EventScores",
                columns: new[] { "EventParticipantEventId", "EventParticipantUserId" });

            migrationBuilder.CreateIndex(
                name: "IX_EventScoreTypes_EventId",
                table: "EventScoreTypes",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventScoreTypes_Name_EventId",
                table: "EventScoreTypes",
                columns: new[] { "Name", "EventId" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_AspNetUsers_OwnerId",
                table: "Events",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_AspNetUsers_OwnerId",
                table: "Events");

            migrationBuilder.DropTable(
                name: "EventScores");

            migrationBuilder.DropTable(
                name: "EventItems");

            migrationBuilder.DropTable(
                name: "EventScoreTypes");

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Events",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Events_AspNetUsers_OwnerId",
                table: "Events",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
