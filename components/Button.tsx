import cn from 'classnames'
import { WithChildren } from '../types'

import Spinner from './Spinner'

const sizes = {
    small: 'py-1.5',
    normal: 'py-2.5'
}

const colors = {
    primary: 'bg-primary text-white border-primary',
    green: 'bg-green-600 text-white border-green-600',
    primaryNoBg: 'bg-white text-primary border-primary',
    red: 'bg-red-600 border-red-600 text-white',
    none: 'bg-white text-black border focus:ring-primary focus:border-gray-200'
}

type Props = {
    type?: 'submit' | 'reset' | 'button'
    color?: 'none' | 'primary' | 'primaryNoBg' | 'red' | 'green'
    disabled?: boolean
    onClick?: Function
    className?: string
    size?: 'small' | 'normal'
    loading?: boolean
    noShadow?: boolean
    roundedFull?: boolean
}

export default function Button({children, loading, size = 'normal', type = 'button', color = 'none', disabled, onClick, roundedFull, className, noShadow}: WithChildren<Props>) {
    return(
        <button 
            type={type} 
            className={cn('border', {[colors[color]]: color, [sizes[size]]: size, 'cursor-not-allowed': disabled, 'shadow-md': !noShadow, 'rounded-full': roundedFull, 'rounded-xl px-5': !roundedFull, 'opacity-50': disabled}, className)} disabled={disabled || loading} 
            onClick={() => onClick && onClick()}
            >
                {loading ? <Spinner /> : children}
        </button>
    )
}