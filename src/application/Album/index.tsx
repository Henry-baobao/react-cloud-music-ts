import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "./style";
import { CSSTransition } from "react-transition-group";
import { useNavigate, useParams } from "react-router";
import Header, { IHeaderRefProps } from "../../baseUI/header";
import AlbumDetail, { AlbumItem } from "../../components/album-detail";
import { isEmptyObject } from "../../api/utils";
import Scroll from "../../baseUI/scroll";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAlbumAsync, savePullUpLoading } from "./store/slice";
import { HEADER_HEIGHT } from "../../api/config";
import style from "../../assets/global-style";
import { EnterLoading } from "../Singers/style";
import Loading from "../../baseUI/loading";

type Props = {};

function Album(props: Props) {
  const album = useAppSelector((state) => state.album);
  const { loading, pullUpLoading, currentAlbum } = album;
  const dispatch = useAppDispatch();

  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const navigate = useNavigate();
  const { id } = useParams();
  const headerRef = useRef<IHeaderRefProps | null>(null);

  useEffect(() => {
    if (!id || !dispatch) return;
    dispatch(
      getAlbumAsync({
        id,
      })
    );
  }, [dispatch, id]);

  const handleScroll = useCallback(
    (pos: any) => {
      const minScrollY = -HEADER_HEIGHT;
      let percent = Math.abs(pos.y / minScrollY);
      let headerDom = headerRef.current;
      if (!headerDom) return;
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = style["theme-color"];
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2).toString();
        currentAlbum && setTitle((currentAlbum as AlbumItem).name);
      } else {
        headerDom.style.backgroundColor = "";
        headerDom.style.opacity = "1";
        setTitle("歌单");
      }
    },
    [currentAlbum]
  );

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  console.log("-------------------------", currentAlbum);
  return (
    <CSSTransition
      in={showStatus}
      timeout={500}
      classNames="fly"
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <Container play={0}>
        <Header ref={headerRef} title={title} handleClick={handleBack} />
        {isEmptyObject(currentAlbum) ? null : (
          <Scroll
            onScroll={handleScroll}
            pullUpLoading={pullUpLoading}
            bounceTop={false}
          >
            <AlbumDetail
              currentAlbum={currentAlbum as AlbumItem}
              pullUpLoading={pullUpLoading}
            />
          </Scroll>
        )}
        {loading ? (
          <EnterLoading>
            <Loading></Loading>
          </EnterLoading>
        ) : null}
      </Container>
    </CSSTransition>
  );
}

export default Album;
