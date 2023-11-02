const Snackbar = ({ type, action, text }) => {
  return (
    <div
      className={`${
        type === "error"
          ? "bg-red-200 border border-red-400 text-slate-600 font-semibold"
          : "bg-green-200 border border-green-400 text-black"
      }  font-montserrat text-center mb-2 rounded-md py-3 hover:cursor-pointer`}
      onClick={action}
    >
      {text}
    </div>
  )
}

export default Snackbar
