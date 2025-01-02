"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { FC, useActionState, useMemo, useState } from "react";
import SubmitButton from "../SubmitButton";
import { createInvoice } from "../../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../../utils/zodSchema";
import { formatCurrency } from "../../utils/format";
import Link from "next/link";

interface ICreateInvoiceProps {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

const CreateInvoice: FC<ICreateInvoiceProps> = ({
  address,
  email,
  firstName,
  lastName,
}) => {
  const [lastResult, action] = useActionState(createInvoice, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, {
        schema: invoiceSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [quantity, setQuantity] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");

  const calculatedTotal = useMemo(
    () => (Number(rate) || 0) * (Number(quantity) || 0),
    [quantity, rate]
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
          <input
            type="hidden"
            name={fields.date.name}
            value={selectedDate.toISOString()}
          />

          <input
            type="hidden"
            name={fields.total.name}
            value={calculatedTotal}
          />

          {/* Invoice Name */}
          <div className="flex flex-col gap-1 w-fit mb-6">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Draft</Badge>
              <Input
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={fields.invoiceName.initialValue}
                placeholder="Invoice Name"
              />
            </div>
            <p className="text-sm text-red-500">{fields.invoiceName.errors}</p>
          </div>

          {/* Number & Currency */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label className="font-bold">Invoice No.</Label>
              <div className="flex">
                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center ">
                  #
                </span>
                <Input
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={fields.invoiceNumber.initialValue}
                  className="rounded-l-none"
                  placeholder="1"
                />
              </div>
              <p className="text-sm text-red-500">
                {fields.invoiceNumber.errors}
              </p>
            </div>

            <div>
              <Label className="font-bold">Currency</Label>
              <Select
                defaultValue="USD"
                name={fields.currency.name}
                key={fields.currency.key}
                onValueChange={(value) => setCurrency(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">
                    United States Dollar -- USD
                  </SelectItem>
                  <SelectItem value="EUR">Euro -- EUR</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.currency.errors}</p>
            </div>
          </div>

          {/* From - To */}
          <div className="mb-6">
            <div className="grid md:grid-cols-2 gap-6 mb-1">
              <Label className="font-bold">From</Label>
              <Label className="font-bold">To</Label>
            </div>
            {/* Name */}
            <div className="grid md:grid-cols-2 gap-6 mb-1">
              <div className="space-y-2">
                <Input
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  defaultValue={firstName + " " + lastName}
                  placeholder="Your Name"
                  maxLength={40}
                />
                <p className="text-sm text-red-500">{fields.fromName.errors}</p>
              </div>
              <div className="space-y-2">
                <Input
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={fields.clientName.initialValue}
                  placeholder="Client Name"
                  maxLength={40}
                />
                <p className="text-sm text-red-500">
                  {fields.clientName.errors}
                </p>
              </div>
            </div>
            {/* Email */}
            <div className="grid md:grid-cols-2 gap-6 mb-1">
              <div className="space-y-2">
                <Input
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  defaultValue={email}
                  placeholder="Your Email"
                  type="email"
                  maxLength={40}
                />
                <p className="text-sm text-red-500">
                  {fields.fromEmail.errors}
                </p>
              </div>
              <div className="space-y-2">
                <Input
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={fields.clientEmail.initialValue}
                  placeholder="Client Email"
                  type="email"
                  maxLength={40}
                />
                <p className="text-sm text-red-500">
                  {fields.clientEmail.errors}
                </p>
              </div>
            </div>
            {/* Address */}
            <div className="grid md:grid-cols-2 gap-6 mb-1">
              <div className="space-y-2">
                <Input
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  defaultValue={address}
                  placeholder="Your Address"
                  maxLength={100}
                />
                <p className="text-sm text-red-500">
                  {fields.fromAddress.errors}
                </p>
              </div>
              <div className="space-y-2">
                <Input
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={fields.clientAddress.initialValue}
                  placeholder="Client Address"
                  maxLength={100}
                />
                <p className="text-sm text-red-500">
                  {fields.clientAddress.errors}
                </p>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div>
                <Label className="font-bold">Date</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[280px] text-left justify-start"
                  >
                    <CalendarIcon />
                    {selectedDate ? (
                      <p>
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "long",
                        }).format(selectedDate)}
                      </p>
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-red-500">{fields.date.errors}</p>
            </div>

            <div>
              <Label className="font-bold">Invoice Due</Label>
              <Select
                name={fields.dueDate.name}
                key={fields.dueDate.key}
                defaultValue={fields.dueDate.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select due date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on Receipt</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.dueDate.errors}</p>
            </div>
          </div>

          {/* Additional information */}
          <div>
            <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
              <p className="col-span-6">Description</p>
              <p className="col-span-2">Quantity</p>
              <p className="col-span-2">Rate</p>
              <p className="col-span-2">Amount</p>
            </div>
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-6">
                <Textarea
                  name={fields.invoiceItemDescription.name}
                  key={fields.invoiceItemDescription.key}
                  defaultValue={fields.invoiceItemDescription.initialValue}
                  placeholder="Item name & description"
                />
                <p className="text-sm text-red-500">
                  {fields.invoiceItemDescription.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  name={fields.invoiceItemQuantity.name}
                  key={fields.invoiceItemQuantity.key}
                  type="number"
                  placeholder="0"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <p className="text-sm text-red-500">
                  {fields.invoiceItemQuantity.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  name={fields.invoiceItemRate.name}
                  key={fields.invoiceItemRate.key}
                  type="number"
                  placeholder="0"
                  min="0"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <p className="text-sm text-red-500">
                  {fields.invoiceItemRate.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  value={formatCurrency(calculatedTotal, currency)}
                  disabled
                  placeholder="$0.00"
                />
              </div>
            </div>
          </div>

          {/* Total Calculation */}
          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="flex justify-between">
                <span className="font-bold">Subtotal</span>
                <span>{formatCurrency(calculatedTotal, currency)}</span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span className="font-bold">Total ({currency})</span>
                <span className="font-medium underline underline-offset-2">
                  {formatCurrency(calculatedTotal, currency)}
                </span>
              </div>
            </div>
          </div>

          {/* Note */}
          <div>
            <Label className="font-bold">
              Note <span className="font-normal text-[12px]">(optional)</span>
            </Label>
            <Textarea
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={fields.note.initialValue}
              placeholder="Add your Note(s) right here..."
            />
            <p className="text-sm text-red-500">{fields.note.errors}</p>
          </div>

          <div className="flex items-center justify-end mt-6">
            <div className="flex gap-4">
              <Link
                href="/dashboard/invoices"
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Back
              </Link>
              <SubmitButton text="Send Invoice to Client" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateInvoice;