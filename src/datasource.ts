import { IntegrationBase } from "@budibase/types"
import { createClient, SupabaseClient } from '@supabase/supabase-js'

type FilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'like'
  | 'ilike'
  | 'is'
  | 'in'
  | 'cs'
  | 'cd'
  | 'sl'
  | 'sr'
  | 'nxl'
  | 'nxr'
  | 'adj'
  | 'ov'
  | 'fts'
  | 'plfts'
  | 'phfts'
  | 'wfts'
  | 'not.eq'
  | 'not.neq'
  | 'not.gt'
  | 'not.gte'
  | 'not.lt'
  | 'not.lte'
  | 'not.like'
  | 'not.ilike'
  | 'not.is'
  | 'not.in'
  | 'not.cs'
  | 'not.cd'
  | 'not.sl'
  | 'not.sr'
  | 'not.nxl'
  | 'not.nxr'
  | 'not.adj'
  | 'not.ov'
  | 'not.fts'
  | 'not.plfts'
  | 'not.phfts'
  | 'not.wfts'

class CustomIntegration implements IntegrationBase {
  private readonly supabaseUrl: string
  private readonly supabaseKey: string
  private readonly schema: string
  private readonly supabase: SupabaseClient

  constructor(config: { supabaseUrl: string; supabaseKey: string, schema: string }) {
    this.supabaseUrl = config.supabaseUrl
    this.supabaseKey = config.supabaseKey
    this.schema = config.schema

    if (!this.schema) {
      this.schema = "public"
    }

    this.supabase = createClient(this.supabaseUrl, this.supabaseKey, {
      schema: this.schema
    })
  }

  async create(query: { from: string, records: string }) {
    if (!query.from) {
      throw new Error("You must provide a 'from' table!")
    }
    const insertRecords = JSON.parse(query.records)
    return await this.supabase.from(query.from).insert(insertRecords)
  }

  async read(query: { from: string, select: string; extra: { [key: string]: string } }) {
    if (!query.from) {
      throw new Error("You must provide a 'from' table!")
    }
    if (!query.select) {
      return await this.supabase.from(query.from)
    }
    if (!query.extra?.filterColumn) {
      return await this.supabase.from(query.from).select(query.select)
    }
    return await this.supabase
      .from(query.from)
      .select(query.select)
      .filter(query.extra.filterColumn, query.extra.filter as FilterOperator, query.extra.filterValue)
  }

  async update(query: { from: string, json: object; extra: { [key: string]: string } }) {
    if (!query.from) {
      throw new Error("You must provide a 'from' table!")
    }
    if (!query.extra?.filterColumn) {
      throw new Error("You must provide a filter!")
    }
    return await this.supabase
      .from(query.from)
      .update(query.json)
      .filter(query.extra.filterColumn, query.extra.filter as FilterOperator, query.extra.filterValue)
  }

  async upsert(query: { from: string, json: object }) {
    if (!query.from) {
      throw new Error("You must provide a 'from' table!")
    }
    return await this.supabase.from(query.from).upsert(query.json)
  }

  async delete(query: { from: string; extra: { [key: string]: string } }) {
    if (!query.from) {
      throw new Error("You must provide a 'from' table!")
    }
    if (!query.extra?.filterColumn) {
      throw new Error("You must provide a filter!")
    }
    return await this.supabase
      .from(query.from)
      .delete()
      .filter(query.extra.filterColumn, query.extra.filter as FilterOperator, query.extra.filterValue)
  }
}

export default CustomIntegration
