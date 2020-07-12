# Migration `20200712161747`

This migration has been generated by Alexander Swed at 7/12/2020, 4:17:47 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

DROP INDEX "User.issuer"

CREATE TABLE "new_User" (
"avatarUrl" TEXT ,
"disabled" BOOLEAN  DEFAULT false,
"email" TEXT NOT NULL,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"lastActivityAt" DATE ,
"lastLoginAt" DATE ,
"name" TEXT ,
"phoneNumber" TEXT ,
"registeredAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
"timeZone" TEXT )

INSERT INTO "new_User" ("avatarUrl", "disabled", "email", "id", "lastActivityAt", "lastLoginAt", "name", "phoneNumber", "registeredAt", "timeZone") SELECT "avatarUrl", "disabled", "email", "id", "lastActivityAt", "lastLoginAt", "name", "phoneNumber", "registeredAt", "timeZone" FROM "User"

PRAGMA foreign_keys=off;
DROP TABLE "User";;
PRAGMA foreign_keys=on

ALTER TABLE "new_User" RENAME TO "User";

CREATE UNIQUE INDEX "User.email" ON "User"("email")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200712161420..20200712161747
--- datamodel.dml
+++ datamodel.dml
@@ -1,16 +1,15 @@
 datasource db {
     provider = "sqlite"
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
 }
 model User {
     id             Int       @id @default(autoincrement())
-    issuer         String    @unique
     email          String    @unique
     name           String?
     phoneNumber    String?
     avatarUrl      String?
```

