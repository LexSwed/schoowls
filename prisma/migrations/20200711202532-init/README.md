# Migration `20200711202532-init`

This migration has been generated by Alexander Swed at 7/11/2020, 8:25:32 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "User" (
"alias" TEXT ,
"avatarUrl" TEXT ,
"disabled" BOOLEAN  DEFAULT false,
"email" TEXT NOT NULL,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"issuer" TEXT NOT NULL,
"lastActivityAt" DATE ,
"lastLoginAt" DATE ,
"name" TEXT ,
"phoneNumber" TEXT ,
"registeredAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
"timeZone" TEXT )

CREATE UNIQUE INDEX "User.issuer" ON "User"("issuer")

CREATE UNIQUE INDEX "User.email" ON "User"("email")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200711202532-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,24 @@
+datasource db {
+    provider = "sqlite"
+    url = "***"
+}
+
+generator client {
+    provider = "prisma-client-js"
+}
+
+// internal info
+model User {
+    id             Int       @default(autoincrement()) @id
+    issuer         String    @unique
+    email          String    @unique
+    name           String?
+    alias          String?
+    phoneNumber    String?
+    avatarUrl      String?
+    timeZone       String?
+    disabled       Boolean?  @default(false)
+    registeredAt   DateTime  @default(now()) // ISO Date
+    lastLoginAt    DateTime? // ISO Date
+    lastActivityAt DateTime? // ISO Date
+}
```

