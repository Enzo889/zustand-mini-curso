import { useShallow } from "zustand/shallow";
import { WhiteCard } from "../../components";
import { useBearStore } from "../../stores";

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears />
        <PolarBears />
        <PandaBears />
        <RedBears />
        <BearDisplay />
      </div>
    </>
  );
};

export const BlackBears = () => {
  const BlackBearsStore = useBearStore((state) => state.blackBears);
  const increaseBlackBears = useBearStore((state) => state.increaseBlackBears);

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBlackBears(1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {BlackBearsStore} </span>
        <button onClick={() => increaseBlackBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};
export const PolarBears = () => {
  const polarBearsStore = useBearStore((state) => state.polarBears);
  const increasePolarBears = useBearStore((state) => state.increasePolarBears);

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePolarBears(1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {polarBearsStore} </span>
        <button onClick={() => increasePolarBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};
export const PandaBears = () => {
  const pandaBearsStore = useBearStore((state) => state.pandaBears);
  const increasePandaBears = useBearStore((state) => state.increasePandaBears);

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePandaBears(1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {pandaBearsStore} </span>
        <button onClick={() => increasePandaBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};
export const RedBears = () => {
  const redBearsStore = useBearStore((state) => state.redBears);
  const increaseRedBears = useBearStore((state) => state.increaseRedBears);
  return (
    <WhiteCard centered>
      <h2>Osos Rojos</h2>
      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseRedBears(1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {redBearsStore} </span>
        <button onClick={() => increaseRedBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const BearDisplay = () => {
  const doNothing = useBearStore((state) => state.doNothing);
  const addBear = useBearStore((state) => state.addBear);
  const removeBear = useBearStore((state) => state.removeBear);

  const bears = useBearStore((state) => state.bears);

  // Para evitar re-renderizados innecesarios se usa useShallow en zustand
  // const bears = useBearStore(useShallow((state) => state.bears));

  return (
    <WhiteCard centered className="flex flex-col gap-4">
      <button onClick={doNothing}>No hacer nada</button>
      <button onClick={addBear}>Agregar oso</button>
      <button onClick={removeBear}>Eliminar osos</button>
      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
};
