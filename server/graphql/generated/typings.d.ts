/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import * as Context from "./server/graphql/context"
import { core, connectionPluginCore } from "@nexus/schema"

declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    connectionField<FieldName extends string>(
            fieldName: FieldName, 
            config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName> 
          ): void
  }
}
declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  PeriodInput: { // input type
    duration: number; // Int!
    startTime: string; // String!
  }
  PeriodWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenRootTypes {
  Mutation: {};
  Period: { // root type
    duration: number; // Int!
    id: number; // Int!
    startTime: string; // String!
  }
  Query: {};
  Timetable: { // root type
    id: number; // Int!
  }
  User: { // root type
    email: string; // String!
    id: number; // Int!
    lastLoginAt?: NexusGenScalars['DateTime'] | null; // DateTime
    name: string; // String!
    phoneNumber?: string | null; // String
    registeredAt: NexusGenScalars['DateTime']; // DateTime!
    timeZone?: string | null; // String
  }
  UserAvatar: { // root type
    url?: string | null; // String
  }
  UserPhone: { // root type
    number?: string | null; // String
  }
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  PeriodInput: NexusGenInputs['PeriodInput'];
  PeriodWhereUniqueInput: NexusGenInputs['PeriodWhereUniqueInput'];
  String: NexusGenScalars['String'];
  Int: NexusGenScalars['Int'];
  Float: NexusGenScalars['Float'];
  Boolean: NexusGenScalars['Boolean'];
  ID: NexusGenScalars['ID'];
  DateTime: NexusGenScalars['DateTime'];
}

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createTimetable: NexusGenRootTypes['Timetable']; // Timetable!
  }
  Period: { // field return type
    duration: number; // Int!
    id: number; // Int!
    startTime: string; // String!
  }
  Query: { // field return type
    me: NexusGenRootTypes['User']; // User!
  }
  Timetable: { // field return type
    id: number; // Int!
    periods: NexusGenRootTypes['Period'][]; // [Period!]!
  }
  User: { // field return type
    avatar: NexusGenRootTypes['UserAvatar']; // UserAvatar!
    email: string; // String!
    id: number; // Int!
    lastLoginAt: NexusGenScalars['DateTime'] | null; // DateTime
    name: string; // String!
    phone: NexusGenRootTypes['UserPhone']; // UserPhone!
    phoneNumber: string | null; // String
    registeredAt: NexusGenScalars['DateTime']; // DateTime!
    timeZone: string | null; // String
  }
  UserAvatar: { // field return type
    url: string | null; // String
  }
  UserPhone: { // field return type
    number: string | null; // String
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createTimetable: { // args
      periods: NexusGenInputs['PeriodInput'][]; // [PeriodInput!]!
    }
  }
  Timetable: {
    periods: { // args
      after?: NexusGenInputs['PeriodWhereUniqueInput'] | null; // PeriodWhereUniqueInput
      before?: NexusGenInputs['PeriodWhereUniqueInput'] | null; // PeriodWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Mutation" | "Period" | "Query" | "Timetable" | "User" | "UserAvatar" | "UserPhone";

export type NexusGenInputNames = "PeriodInput" | "PeriodWhereUniqueInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    
  }
  interface NexusGenPluginSchemaConfig {
  }
}