import gsap, {ScrollTrigger} from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

let container = document.querySelector('.container');
let sections = gsap.utils.toArray(".panel");
let getRandomColor = gsap.utils.random("red,blue,orange,purple".split(","), true);

let scrollTween = gsap.to('.container', {
  x: () => -(container.scrollWidth - document.documentElement.clientWidth) + "px",
  ease: "none",
  scrollTrigger: {
    trigger: container,
    pin: true,
    scrub: 1,
    end: () => "+=" + container.offsetWidth,
    invalidateOnRefresh: true,
  }
});


const addSection = () => {
  const sectionEl = document.createElement("section");
  sectionEl.classList.add('panel', getRandomColor());
  sectionEl.textContent = "New section " + sections.length;

  const st = scrollTween.scrollTrigger,
        oldProgress = st.progress;

  container.append(sectionEl);

  sections.push(sectionEl);

  // we use a CSS variable because when you pin something with ScrollTrigger, it must record the width/height initially and then revert that when refreshing, thus if we directly set the width inline, it'll be lost during refresh().
  gsap.set(container, { "--width": (sections.length * 100) + "%" });

  // update scrolltrigger
  ScrollTrigger.refresh();
  // adjust the scroll position according to the previous ratio to make it appear seamless even though the ratios changed
  st.scroll(st.start + (st.end - st.start) * oldProgress * (sections.length - 2) / (sections.length - 1));
  st.update(); // don't wait for the scroll event to trigger the scrub animation - force it immediately so we can force it to the end
  st.endAnimation(); // get rid of the scrub animation to the new scroll position (to make it look seamless)
}

document.querySelector('button').addEventListener('click', addSection);