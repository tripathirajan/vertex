import * as React from 'react';
import { ThemeProvider, useTheme } from '@vertex-lab/theme';
import {
  Tabs, TabList, Tab, TabPanel,
  Button,
  Accordion, AccordionItem, AccordionHeader, AccordionPanel,
  Switch, Checkbox,
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription
} from '@vertex-lab/ui';
import { Moon, Sun, Monitor } from 'lucide-react';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-md transition-colors ${theme === 'light' ? 'bg-white shadow-sm text-primary-600' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'}`}
      >
        <Sun size={18} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-md transition-colors ${theme === 'dark' ? 'bg-neutral-700 shadow-sm text-primary-400' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'}`}
      >
        <Moon size={18} />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-md transition-colors ${theme === 'system' ? 'bg-white dark:bg-neutral-700 shadow-sm text-primary-600 dark:text-primary-400' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'}`}
      >
        <Monitor size={18} />
      </button>
    </div>
  );
}

function Playground() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <header className="border-b border-neutral-200 dark:border-neutral-800 sticky top-0 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">V</div>
            <h1 className="text-xl font-bold tracking-tight">Vertex UI</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Playground</h2>
            <p className="text-neutral-500 dark:text-neutral-400">Experiment with Vertex components.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Buttons Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b border-neutral-200 dark:border-neutral-800 pb-2">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b border-neutral-200 dark:border-neutral-800 pb-2">Tabs</h3>
              <Tabs defaultValue="preview">
                <TabList>
                  <Tab value="preview">Preview</Tab>
                  <Tab value="code">Code</Tab>
                  <Tab value="docs">Docs</Tab>
                </TabList>
                <TabPanel value="preview">
                  <div className="p-8 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 flex items-center justify-center">
                    <p className="text-neutral-500 italic">Component Preview Content</p>
                  </div>
                </TabPanel>
                <TabPanel value="code">
                  <pre className="p-4 bg-neutral-900 text-neutral-100 rounded-lg text-sm overflow-x-auto">
                    <code>{`<Tabs defaultValue="preview">
  <TabList>
    <Tab value="preview">Preview</Tab>
    <Tab value="code">Code</Tab>
  </TabList>
  <TabPanel value="preview">...</TabPanel>
  <TabPanel value="code">...</TabPanel>
</Tabs>`}</code>
                  </pre>
                </TabPanel>
                <TabPanel value="docs">
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p>Tabs are used to organize content into different views that can be toggled.</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>WAI-ARIA compliant</li>
                      <li>Keyboard navigation supported</li>
                      <li>Controlled or uncontrolled</li>
                    </ul>
                  </div>
                </TabPanel>
              </Tabs>
            </div>

            {/* Accordion Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b border-neutral-200 dark:border-neutral-800 pb-2">Accordion</h3>
              <Accordion type="single" collapsible defaultValue={['item-1']}>
                <AccordionItem value="item-1">
                  <AccordionHeader>Is it accessible?</AccordionHeader>
                  <AccordionPanel>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionHeader>Is it unstyled?</AccordionHeader>
                  <AccordionPanel>
                    Yes. It's built on top of headless primitives.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionHeader>Can it be multiple?</AccordionHeader>
                  <AccordionPanel>
                    Yes. Just set the type to "multiple".
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Selection Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b border-neutral-200 dark:border-neutral-800 pb-2">Selection</h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <Switch id="airplane-mode" />
                  <label htmlFor="airplane-mode" className="text-sm font-medium">Airplane Mode</label>
                </div>
                <div className="flex items-center gap-4">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Accept terms and conditions
                  </label>
                </div>
              </div>
            </div>

            {/* Overlay Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b border-neutral-200 dark:border-neutral-800 pb-2">Overlay</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="name" className="text-right text-sm font-medium">Name</label>
                      <input id="name" defaultValue="Rajan Tripathi" className="col-span-3 h-9 rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="username" className="text-right text-sm font-medium">Username</label>
                      <input id="username" defaultValue="@rajan" className="col-span-3 h-9 rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Playground />
    </ThemeProvider>
  );
}
