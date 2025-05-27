"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import {  useEditTransporter } from "@/hooks/useTransporter"

const statusEnum = z.enum(["active", "inactive", "suspended"])

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    contact: z.string().min(1, { message: "Contact is required" }),
    vehicleType: z.string().min(1, { message: "Vehicle type is required" }),
    capacity: z.coerce.number().positive("Capacity must be positive").optional(),
    status: statusEnum.default("active").optional(),
})

export function EditTransporterForm({ name, contact, vehicleType, capacity, status, id}: any) {
    const router = useRouter()
    const { mutate, isError, isPending, isSuccess } = useEditTransporter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name,
            contact: contact,
            vehicleType: vehicleType,
            capacity: capacity,
            status: status,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        // TODO: Call API to create transporter
        mutate({
            name: values.name,
            contact: values.contact ?? contact,
            vehicleType: values.vehicleType ?? vehicleType,
            capacity: values.capacity ?? capacity,
            status: values.status ?? status,
            id: id
        })
        // router.push("/admin/transporters")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Transporter Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact</FormLabel>
                            <FormControl>
                                <Input placeholder="Contact Number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="vehicleType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Vehicle Type</FormLabel>
                            <FormControl>
                                <Input placeholder="Vehicle Type" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Capacity (tons)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Capacity" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <select
                                    {...field}
                                    className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="cursor-pointer px-8 py-1">Create Transporter</Button>
            </form>
        </Form>
    )
}
