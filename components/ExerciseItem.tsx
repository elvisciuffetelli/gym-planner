import { deleteExercise } from "../api/exercises"
import { Exercise } from "../types"
import Button from "./Button"
import {FaMinus} from 'react-icons/fa'

type Props = {
  exercise: Exercise,
  onExerciseDeleted: () => void
}

function ExerciseItem({ exercise, onExerciseDeleted }: Props) {

  return (
    <div className='flex justify-between bg-slate-200 m-4 p-4 shadow-md'>
      <h4>{exercise?.name}</h4>
      <Button 
        className='w-[30px] h-[30px] flex justify-center items-center	' 
        color='red' 
        noShadow
        roundedFull
        size="small" 
        onClick={() => {
          deleteExercise(exercise._id, onExerciseDeleted)
      }}>
        <FaMinus />
      </Button>
    </div>
  )
}

export default ExerciseItem
