/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'

interface StatCardProps {
    type: 'appointments' | 'pending' | 'cancelled'
    count: number
    label: string
    icon: string
}

const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div 
    className={clsx('stat-card', {
        'bg-appointments': type === 'appointments',
        'bg-pending': type === 'pending',
        'bg-cancelled': type === 'cancelled'
    })}>
        <div className='flex items-center gap-4'>
            <Image 
                src={icon}
                height={32}
                width={32}
                alt={label}
                className='size-8 w-fit'
            />

        </div>
    </div>
  )
}

export default StatCard